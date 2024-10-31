interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  // Add other properties that Cloudinary returns
}

export const UploadToCloudinary = async (
  rawImage: File | Blob
): Promise<CloudinaryResponse | undefined> => {
  const formData = new FormData();
  formData.append("file", rawImage);
  formData.append("upload_preset", "skilldesk");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/laon/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      console.log("Failed to upload image to cloud");
      return undefined;
    }
    const imageData: CloudinaryResponse = await response.json();
    console.log("Image uploaded:", imageData);
    return imageData;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};