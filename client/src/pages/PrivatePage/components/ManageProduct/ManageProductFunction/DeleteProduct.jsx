import { apiAdminDeleteProductById } from "../../../../../services/product"; 

export const handleAdminDeleteProduct = async (productId, setProductInfo, setIsVisibleConfirmDeleteProductWindow) => {
    try {
        await apiAdminDeleteProductById(productId);
        setProductInfo(prevProductInfo => prevProductInfo.filter(productInfo => productInfo.id !== productId));
    } catch (error) {
        console.log(error);
    }
    setIsVisibleConfirmDeleteProductWindow(false);
};
