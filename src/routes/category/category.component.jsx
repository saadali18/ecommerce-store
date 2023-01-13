import {useContext, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './category.styles.scss'
import {CategoriesContext} from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

const Category  = () => {
    const { category } = useParams();
    const { CategoriesMap } = useContext(CategoriesContext)
    const [products, setProducts] = useState([CategoriesMap[category]])

    useEffect(() => {
        setProducts(CategoriesMap[category])
    }, [category, CategoriesMap])

    return(
        <div className='category-container'>
        {   
            products &&
            products.map((product) => <ProductCard product={product}/>)
        }
        </div>
    )
}

export default Category