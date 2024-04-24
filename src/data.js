export const API_KEY = `AIzaSyD6VzEk5rRrzndXn4evQpF6Dqe4E6yYPbY`;

export const value_converter = (value) =>{
     if(value>=1000000){
        return Math.floor(value/1000000)+"M"
     }
     else if(value>=10000){
        return Math.floor(value/10000)+"K"
     }
     else{
        return value
     }
    }