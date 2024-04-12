import React, { useState } from "react";
import axios from "axios";

const NeuralNetworkAPI = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setPrediction(null);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://cifar10imageclassification-9230baec398c.herokuapp.com/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.prediction);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  return (
    <div className="container">
      <h1>Welcome to CSE 676 B Deep Learning Course</h1>
      <h2>Upload Image for CIFAR 10 Image Classification</h2>
      <label className="file-input-label"><input type="file" onChange={onChange}/></label>
      {file && (
      <button onClick={onSubmit} style={{ marginLeft: "10px" }}>Submit</button>
      )}
      <div className="result">
        {file && (
          <div>
            <h3>Uploaded Image:</h3>
            <img src={URL.createObjectURL(file)} alt="Uploaded Image" className="uploaded-image" />
          </div>
          )}
        {prediction && (
          <div className="prediction">
            <h3>Predicted Class:</h3>
            <p>{prediction}</p>
          </div>
        )}
      </div>
      <div className="watermark">Developed by Vamshi Krishna Kyatham</div>
    </div>
  );
};

export default NeuralNetworkAPI;
