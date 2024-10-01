export const createUserValidationSchema={
    name:{
        isLength:{
            options:{
                min:3,
                max:32
            },
            errorMessage:"username must be atleast 3-32 characters"
        },
        notEmpty:{
            errorMessage:"username is required"
        },
        isString:{
            errorMessage:"username must be string"
        }
    },
    username:{
        notEmpty:true
    }
}