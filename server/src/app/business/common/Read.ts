/**
 * Created by Lzientek on 01-10-2016
 */

interface Read<T> {
    retrieve: (callback: (error: any, result: T)=> void)=> void ;
    findById: (_id: string, callback: (error:any, result: T) => void) => void;

}

export = Read;