import React, { useState } from "react";
import { useNavigate } from "react-router";
import useRequest from "../../hooks/useRequest";
import { validate } from "../../utils/formValidate";
import { toast } from "react-toastify";

const initialValues = {
    title: "",
    genre: "",
    rating: "",
    duration: "",
    description: "",
    imageUrl: ""
}

export default function CreateMovie(){
    const [data,setData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched,setTouched] = useState({});
    const navigate = useNavigate();   
    const {request} = useRequest();

    const changeHandler = (e) =>{
        setData((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const submitAction = async () => {
      const validationErrors = validate(data);
      setErrors(validationErrors);
      const touchedFields = {};
      Object.keys(validationErrors).forEach(key => {
        touchedFields[key] = true;
      });
      setTouched(touchedFields);

      if (Object.keys(validationErrors).length > 0) {
          return;
      }

      try {
        await request('/data/movies', 'POST', data);
        setData(initialValues);
        setErrors({}); 
        toast.success("Created!");
        navigate('/catalog');
      } catch (error) {      
            toast.error(error.message || "Something went wrong!");
      }

  }

    const inputClass = (field) => `${errors[field] && touched[field] 
    ? 'border-2 border-red-600 bg-red-950/60 animate-shake focus:border-red-400 shadow-error-icon' 
    : data[field] 
    ? 'border-2 border-green-600 bg-green-950/25 focus:border-green-400 shadow-success-icon' 
    : 'border border-gray-400 bg-zinc-900/70'} px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder:italic placeholder:text-lg placeholder-white text-white transition`;

    const validationHandler = (e) =>{
      setTouched((state)=>({
        ...state,
        [e.target.name]: true
      }));

      const errors = validate(data);
      setErrors(errors);
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Add Movie
                    </h2>
                    
                    <form className="space-y-6" action={submitAction}>
                        {/* Title Field */}
                        <div>
                            <label 
                                htmlFor="title" 
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className={`w-full ${inputClass('title')}`}
                                placeholder="Enter movie title"
                                value={data.title}
                                onChange={changeHandler}
                                onBlur={validationHandler}

                            />
                            {errors.title && touched.title && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
                            )}
                        </div>

                        {/* Genre Field */}
                        <div>
                            <label 
                                htmlFor="genre" 
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Genre
                            </label>
                            <input
                                type="text"
                                id="genre"
                                name="genre"
                                className={`w-full ${inputClass('genre')}`}
                                placeholder="Enter movie genre"
                                value={data.genre}
                                onChange={changeHandler}
                                onBlur={validationHandler}
                            />
                            {errors.genre && touched.genre && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.genre}</p>
                            )}
                        </div>

                        <div>
                            <label 
                                htmlFor="rating" 
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Rating
                            </label>
                            <input
                                type="text"
                                id="rating"
                                name="rating"
                                className={`w-full ${inputClass('rating')}`}
                                placeholder="Enter movie rating"
                                value={data.rating}
                                onChange={changeHandler}
                                onBlur={validationHandler}
                            />
                            {errors.rating && touched.rating && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.rating}</p>
                            )}
                        </div>

                        <div>
                            <label 
                                htmlFor="duration" 
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Duration
                            </label>
                            <input
                                type="text"
                                id="duration"
                                name="duration"
                                className={`w-full ${inputClass('duration')}`}
                                placeholder="Enter movie duration"
                                value={data.duration}
                                onChange={changeHandler}
                                onBlur={validationHandler}
                            />
                            {errors.duration && touched.duration && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.genre}</p>
                            )}
                        </div>

                        {/* Description Field */}
                        <div>
                            <label 
                                htmlFor="description" 
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="5"
                                className={`w-full resize-none ${inputClass('description')}`}
                                placeholder="Enter movie description"
                                value={data.description}
                                onChange={changeHandler}
                                onBlur={validationHandler}
                            />
                            {errors.description && touched.description && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                            )}
                        </div>

                        {/* Image URL Field */}
                        <div>
                            <label 
                                htmlFor="imageUrl" 
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Image URL
                            </label>
                            <input
                                type="url"
                                id="imageUrl"
                                name="imageUrl"
                                className={`w-full ${inputClass('imageUrl')}`}
                                placeholder="Enter image URL"
                                value={data.imageUrl}
                                onChange={changeHandler}
                                onBlur={validationHandler}
                            />
                            {errors.imageUrl && touched.imageUrl && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.imageUrl}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Create Movie
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}