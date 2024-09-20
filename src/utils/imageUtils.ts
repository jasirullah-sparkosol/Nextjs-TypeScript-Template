export const getFullImagePath = (fileName: string) => {
    const baseUrl = process.env.NEXT_APP_API_URL;
    return `${baseUrl}/uploads/${fileName}`;
};
