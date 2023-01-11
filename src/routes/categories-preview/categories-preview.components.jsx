import { useContext } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import './categories-preview.styles.scss';
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const { CategoriesMap } = useContext(CategoriesContext)

    return (
        <div className='category-preview-container'>
            {
                Object.keys(CategoriesMap).map((title) => {
                    const products = CategoriesMap[title];
                    return <CategoryPreview key={title}  title={title} products={products} />
                })
            }
        </div>

    )
}

export default CategoriesPreview;