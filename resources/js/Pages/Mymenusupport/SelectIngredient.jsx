import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';


export default function selectingredient(props, {selectboxdata}) {

const [ingredientdata, setIngredientdata] = useState(0);
const [quantitydata, setQuantitydata] = useState();

  return (
     <div className="flex flex-row my-5">
        <select onChange={e => setIngredientdata(e.target.value)}>
              {props.ingredient.map((ingredient) => (
            <option value={ingredient.id}>{ingredient.name}</option>
                                    ))}
        </select>
        <p>×</p>
        <input type="" onChange={(e) => setQuantitydata(e.target.value)}/>
        {selectboxdata(ingredientdata, quantitydata)}
      </div>
    )
}