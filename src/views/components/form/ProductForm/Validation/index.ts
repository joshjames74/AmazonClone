import { LessThan } from "typeorm";

export function validatePrice(price: number, maxPrice: number = 100000): boolean {
    if (!price) {
        return true;
    };
    if (isNaN(price)) {
        return false;
    };
    if (price < 0) {
        return false;
    };
    if (price > maxPrice) {
        return false;
    };
    return true;
};

export function validateTitle(title: string, maxLength: number = 100): boolean {
    if (!title) {
        return true;
    };
    if (title.length > maxLength) {
        return false;
    };
    return true;
};

export function validateDescription(description: string, maxLength: number = 100): boolean {
    if (!description) {
        return true;
    };
    if (description.length > maxLength) {
        return false;
    };
    return true;
};

export function validateImage(image: string): boolean {
    console.log(image);
    if (!image || image.length === 0) {
        return true;
    };
    if (image.length > 1) {
        return false;
    }
    return true;
};

export function finalValidation() {
    return
};