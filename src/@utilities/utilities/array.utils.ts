import {ObjectUtils} from './object.utils';

export abstract class ArrayUtils {
    static inArray(array: any[], find: any): boolean {
        return array.includes(find);
    }

    static notInArray(array: any[], find: any): boolean {
        return !this.inArray(array, find);
    }

    static objectInArray (arr: any[], obj: any): boolean {
        const esta = arr.find(oo => ObjectUtils.areEquals(oo, obj));
        return !!esta;
    }

    static findPropObjectInArray(arr: any[], prop: any, value: any): boolean {
        const esta = arr.find(oo => oo.hasOwnProperty(prop) && oo[prop] === value);
        return !!esta;
    }

    static objectNotInArray (arr: any[], obj: any): boolean {
        return !this.objectInArray(arr, obj);
    }

    static cloneArray (arr: any[]): any[] {
        return [ ...arr];
    }

    static removeFromArray (arr: any[], ind: number): any[] {
        arr.splice(ind, 1);
        return arr;
    }
}
