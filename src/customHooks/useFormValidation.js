import { useState } from "react"

const useFormValidation = (validationRules) => {
    const [errors, setErrors] = useState({})

    const validateField = (name, value) => {
        const rule = validationRules[name];
        if (!rule) {
            return '';
        }

        if (rule.required && !value.trim()) {
            return rule.requiredMessage || `${name} is required`
        }

        if (rule.pattern && !rule.pattern.test(value)) {
            return rule.patternMessage || `Invalid ${name} format`
        }

        if (rule.minLength && value.length < rule.minLength) {
            return rule.minLengthMessage || `${name} must be at least ${rule.minLength} characters`;
        }

        if (rule.maxLength && value.length > rule.maxLength) {
            return rule.maxLengthMessage || `${name} can be upto ${rule.maxLength} characters`;
        }

        if (rule.isArray) {
            const arrayValue = value
                .split(",")
                .map(tag => tag.trim())
                .filter(tag => tag);

            if (rule.minLength && arrayValue.length < rule.minLength) {
                return rule.minLengthMessage || `${name} must be have at least ${rule.minLength} items`;
            }

        }

        return '';
    }

    const validateForm = (formData) => {
        const newErrors = {};
        let isValid = true;

        Object.keys(validationRules).forEach(field => {
            const error = validateField(field, formData.get(field) || '')
            if (error) {
                newErrors[field] = error
                isValid = false;
            }
        })

        setErrors(newErrors)
        return isValid
    }

    const clearError = (field) => {
        setErrors(prevState => ({ ...prevState, [field]: '' }))
    }

    return { errors, validateField, validateForm, clearError }
}

export default useFormValidation