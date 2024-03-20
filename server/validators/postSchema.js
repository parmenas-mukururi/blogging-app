export const postSchema = {
    title: {
        notEmpty: {
            errorMessage: "Title cannot be empty",
        },
        isString: {
            errorMessage: "Title must be a string",
        },
    },
    content: {
        notEmpty: {
            errorMessage: "Post cannot be empty",
        },
        isString: {
            errorMessage: "Post must be a string",
        },
        isLength: {
            options: { min: 100 },
            errorMessage: "Post should be at least 100 characters",
        },
    },
    category : {
        notEmpty: {
            errorMessage: "Category cannot be empty",
        },
        isString: {
            errorMessage: "Category must be a string",
        },
    }
}