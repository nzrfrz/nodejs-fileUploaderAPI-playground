export const responseStatus = () => {
    return {
        success: 200,
        errorServer: 500,
        errorRequest: 400,
    }
};

export const responseMessage = () => {
    return {
        errorServer: "Something went wrong, please try again later !!",
        successCreateBlogPost: "New blog post created successfully !!!",
        successEditBlogPost: "Blog post edited successfully !!!",
        successDeleteBlogPost: "Blog post deleted successfully !!!",
        successTokenValid: "Token valid",
        errorCreateBlogPost: "Error creating new blog post !!!",
        errorBlogPostNotFound: "Blog post not found or has been deleted !!!",
        errorTokenInvalid: "Token invalid or expired !!!",
        errorAccess: "Access token required !!!"
    }
};

export const responseHelper = (res, status, message, data) => {
    return res.status(status).send({ status, message, data });
};