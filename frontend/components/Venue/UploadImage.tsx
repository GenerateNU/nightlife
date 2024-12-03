import React, { useState } from "react";
import ImageUploading from "react-images-uploading";

type UploadImageProps = {
  onImageUpload: (uri: string | null) => void; 
};

/**
 * Allows image uploading capabilities
 */
export const UploadImage: React.FC<UploadImageProps> = ({ onImageUpload }) => {
  const [images, setImages] = useState([]); 
  const maxNumber = 1; 

  const onChange = (imageList) => {
    setImages(imageList); 

    if (imageList.length > 0) {
      onImageUpload(imageList[0].data_url);
    } else {
      onImageUpload(null);
    }
  };

  return (
    <div className="App">
      <ImageUploading
        multiple={false} 
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center", 
                height: "40px", 
              }}
            >
              <button
                style={{
                  backgroundColor: "white", 
                  marginLeft:-20,
                  color: "black",
                  padding: "12px 125px", 
                  fontSize: "16px", 
                  border: "none", 
                  borderRadius: "50px", 
                  cursor: "pointer", 
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
                  transition: "background-color 0.3s ease",
                  ...(isDragging ? { backgroundColor: "#f8d7da", color: "red" } : {}),
                }}
                onClick={onImageUpload}
                {...dragProps}
              >
                Upload Image
              </button>
            </div>

            {imageList.map((image, index) => (
              <div
                key={index}
                className="image-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", 
                  justifyContent: "center", 
                  marginTop: "15px",
                  width: "100%",
                }}
              >
                <img
                  src={image.data_url}
                  alt="Uploaded"
                  style={{
                    maxWidth: "80%", 
                    maxHeight: "300px",
                    objectFit: "contain", 
                    borderRadius: "10px",
                  }}
                />
                <div
                  className="image-item__btn-wrapper"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly", 
                    width: "60%", 
                    marginTop: "10px",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "12px 24px",
                      fontSize: "14px",
                      border: "none",
                      borderRadius: "50px",
                      cursor: "pointer",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "background-color 0.3s ease",
                    }}
                    onClick={() => onImageUpdate(index)}
                  >
                    Update
                  </button>
                  <button
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "12px 24px",
                      fontSize: "14px",
                      border: "none",
                      borderRadius: "50px",
                      cursor: "pointer",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "background-color 0.3s ease",
                    }}
                    onClick={() => onImageRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default UploadImage;
