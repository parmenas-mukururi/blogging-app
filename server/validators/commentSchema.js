export const commentSchema = {
    content: {
      notEmpty: {
        errorMessage: "Comment cannot be empty",
      },
    }
  };
