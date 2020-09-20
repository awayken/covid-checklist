export const argsToAttributes = args => {
         return Object.keys(args).reduce((argString, key) => {
           if (!args[key]) {
             return argString;
           }

           return `${argString} ${key}="${args[key]}"`;
         }, '');
       };
