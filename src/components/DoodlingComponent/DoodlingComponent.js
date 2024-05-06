import React, { useRef, useEffect, useState } from "react";
import "./DoodlingComponent.scss";
const DoodlingComponent = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [prevX, setPrevX] = useState(null);
  const [prevY, setPrevY] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set initial drawing settings
    context.lineWidth = 2;
    context.lineCap = "round";
    context.strokeStyle = "black";

    const handleStartDrawing = (event) => {
      const rect = canvas.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      setIsDrawing(true);
      setPrevX(offsetX);
      setPrevY(offsetY);
    };

    const handleDrawing = (event) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const currentX = event.clientX - rect.left;
      const currentY = event.clientY - rect.top;
      drawLine(context, prevX, prevY, currentX, currentY);
      setPrevX(currentX);
      setPrevY(currentY);
    };

    const handleStopDrawing = () => {
      setIsDrawing(false);
      if (canvas) {
        setUndoStack((prevStack) => [...prevStack, canvas.toDataURL()]);
        setRedoStack([]);
      }
    };

    canvas.addEventListener("mousedown", handleStartDrawing);
    canvas.addEventListener("mousemove", handleDrawing);
    canvas.addEventListener("mouseup", handleStopDrawing);
    canvas.addEventListener("mouseout", handleStopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", handleStartDrawing);
      canvas.removeEventListener("mousemove", handleDrawing);
      canvas.removeEventListener("mouseup", handleStopDrawing);
      canvas.removeEventListener("mouseout", handleStopDrawing);
    };
  }, [isDrawing, prevX, prevY]);

  const drawLine = (context, x1, y1, x2, y2) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const undo = () => {
    if (undoStack.length > 1) {
      const lastState = undoStack.pop();
      setRedoStack((prevStack) => [lastState, ...prevStack]);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const img = new Image();
      img.src = undoStack[undoStack.length - 1];
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
      };
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.shift();
      setUndoStack((prevStack) => [...prevStack, nextState]);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const img = new Image();
      img.src = nextState;
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
      };
    }
  };

  return (
    <div className="doodle">
      {" "}
      Doodle Here!
      <canvas
        className="doodle__canvas"
        ref={canvasRef}
        width={300}
        height={600}
      />
      <div className="doodle__buttons">
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button className="doodle__save">Save(feature coming soon)</button>
      </div>
    </div>
  );
};

export default DoodlingComponent;
