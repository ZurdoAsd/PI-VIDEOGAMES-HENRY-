function validate(input) {
    let errors = {};
    if(!input.name){
      errors.name = 'Name is required';
  }else{
      if(input.name.trim() === ""||input.name.length<3 || input.name.length>16){
          errors.name = 'The name is invalid';
      }
  }

  if(!input.description||input.description.trim() === ""){
      errors.description = 'This Description is required';
  }else{
      if(input.description.length<3 || input.description.length>64){
          errors.description = 'The data is invalid';
      }
  }

      if(!input.released || input.released.trim() === ""){
    errors.released = 'This Released is required';
  }

  if(input.platforms.length===0){
      errors.platforms = 'This Platform is required';
  }else{
      if(input.platforms.length>5){
          errors.platforms = 'The maximum is 5';
      }
  }

  if(!input.rating){
      errors.rating = 'This Rating is required';
  }else{
      if(input.rating<1 || input.rating>5){
          errors.rating = 'Between 1 and 5';
      }
  }

  if(input.genres.length===0){
      errors.genres = 'This Genres is required';
  }else{
      if(input.genres.length>3){
          errors.genres = 'The maximum is 3';
      }
  }
    return errors;
  }
  export default  validate