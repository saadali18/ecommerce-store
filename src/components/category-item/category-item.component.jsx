import {Body, BackgroundImage, CategoryContainer} from './category-item.styles';

const CategoryItem = ({ category }) => {
    const {imageUrl, title} = category;
    return(
        <CategoryContainer>
            <BackgroundImage
                imageUrl={imageUrl}
            />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </CategoryContainer>
    )
}

export default CategoryItem;