export const getErrorMessage = (ex) => {
    const infoData = ex.response?.data;

    if (infoData?.errors) {
        const messages = Object.values(infoData.errors).flat();
        return messages.join("\n");
    }

    return infoData?.message || ex.message || "Une erreur est survenue.";
};