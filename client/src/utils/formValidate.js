export const validate = (values) => {
    const errors = {};
  
    // --- USER AUTHENTICATION FIELDS ---
  
    // Validate Name (Only if 'name' field exists in the form)
    if (values.hasOwnProperty('name')) {
      if (!values.name) {
        errors.name = 'Full name is required';
      } else if (values.name.length > 100) {
        errors.name = 'Name is too big';
      } else if (values.name.length < 3) {
        errors.name = 'Name must be at least 3 characters';
      }
    }
  
    // Validate Email (Only if 'email' field exists)
    if (values.hasOwnProperty('email')) {
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }
  
    // Validate Password (Only if 'password' field exists)
    if (values.hasOwnProperty('password')) {
      if (!values.password) {
        errors.password = 'Password is required';
      } else {
          // Only apply strict complexity rules for Registration (implied by presence of 'name')
          // OR simply apply them everywhere if you want strict login rules too.
          // Here we apply them everywhere for consistency based on your request.
          if (values.password.length < 6)
              errors.password = 'Password must be at least 6 characters';
          else if (!/[A-Z]/.test(values.password))
              errors.password = 'Password must contain at least one uppercase letter';
          else if (!/[a-z]/.test(values.password))
              errors.password = 'Password must contain at least one lowercase letter';
          else if (!/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(values.password))
              errors.password = 'Password must contain at least one number or symbol';
      }
    }
  
    // Validate Terms (Only if 'terms' field exists)
    if (values.hasOwnProperty('terms')) {
      if (values.terms === false) {
        errors.terms = 'Age validation required';
      }
    }
  
    // --- MOVIE FIELDS (For Create/Edit Movie) ---
  
    // Validate Title
    if (values.hasOwnProperty('title')) {
      if (!values.title) errors.title = 'Title is required';
    }
  
    if (values.hasOwnProperty('genre')) {
      if (!values.genre) errors.genre = 'Genre is required';
    }
  
    // Validate Description
    if (values.hasOwnProperty('description')) {
      if (!values.description) errors.description = 'Description is required';
    }
  
    // Validate Image URL
    if (values.hasOwnProperty('imageUrl')) {
      if (!values.imageUrl) errors.imageUrl = 'Image URL is required';
    }
  
    return errors;
  };