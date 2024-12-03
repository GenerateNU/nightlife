import React, { useState } from "react";
import ImageUploading from "react-images-uploading";

type UploadImageProps = {
  onImageUpload: (uri: string | null) => void; // Expect a callback from parent
};

export const UploadImage: React.FC<UploadImageProps> = ({ onImageUpload }) => {
  const [images, setImages] = useState([]); // State for the image list
  const maxNumber = 1; // Limit to one image

  const onChange = (imageList) => {
    setImages(imageList); // Update the component's state

    // Pass the URI of the first image (or null if no image) to the parent
    if (imageList.length > 0) {
      onImageUpload(imageList[0].data_url);
    } else {
      onImageUpload(null);
    }
  };

  return (
    <div className="App">
      <ImageUploading
        multiple={false} // Only allow one image
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <div
              style={{
                display: "flex",
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
                height: "40px", // Adjust height for spacing
              }}
            >
              <button
                style={{
                  backgroundColor: "white", // White background
                  marginLeft:-20,
                  color: "black", // Black text
                  padding: "12px 125px", // Adequate padding for a round shape
                  fontSize: "16px", // Larger font size
                  border: "none", // Remove border
                  borderRadius: "50px", // Fully rounded corners
                  cursor: "pointer", // Pointer cursor on hover
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional shadow
                  transition: "background-color 0.3s ease", // Smooth hover effect
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
                  alignItems: "center", // Center content horizontally
                  justifyContent: "center", // Center content vertically
                  marginTop: "15px",
                  width: "100%", // Take full container width
                }}
              >
                <img
                  src={image.data_url}
                  alt="Uploaded"
                  style={{
                    maxWidth: "80%", // Ensure the image doesn’t exceed the screen width
                    maxHeight: "300px", // Limit the height
                    objectFit: "contain", // Maintain aspect ratio
                    borderRadius: "10px", // Optional rounded corners
                  }}
                />
                <div
                  className="image-item__btn-wrapper"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly", // Space buttons evenly
                    width: "60%", // Ensure buttons align under the image
                    marginTop: "10px",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "12px 24px",
                      fontSize: "14px", // Slightly smaller font for secondary actions
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
