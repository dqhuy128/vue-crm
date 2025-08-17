import axios from 'axios';
import { ref } from 'vue';
import { useAuth } from 'vue-auth3';
import { apiUri } from '@/constants/apiUri';
const data = ref(null);
const categories = ref([]);
export function useDocument() {
    const auth = useAuth();
    const error = ref(null);
    const loadingPromise = ref();
    const isLoading = ref(false);
    const doFetch = async (url, token) => {
        isLoading.value = true;
        const response = await auth
            .fetch({
            method: 'get',
            url: url,
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.data)
            .then((json) => {
            data.value = json.data;
            return json.data;
        })
            .catch((err) => (error.value = err))
            .finally(() => (isLoading.value = false));
    };
    const fetchCategoryDocument = async () => {
        if (categories.value.length > 0)
            return;
        const response = await axios.get(`${apiUri}/categories/list?type=document`, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        const { data } = response.data;
        data.items.map((item) => {
            item.map((subItem) => {
                categories.value.push({
                    id: subItem.id,
                    name: subItem.name,
                });
            });
        });
    };
    const deleteDocument = async (id) => {
        ///document/delete
        const formData = new FormData();
        formData.append('id', id);
        const response = await axios.post(`${apiUri}/document/delete`, formData, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        });
    };
    const fetchDetailDocument = async (id) => {
        const response = await axios
            .get(`${apiUri}/document/detail`, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
            params: {
                id: id,
            },
        })
            .then((res) => res.data)
            .catch((err) => (error.value = err))
            .finally(() => (isLoading.value = false));
    };
    return {
        data,
        error,
        loadingPromise,
        isLoading,
        doFetch,
        fetchCategoryDocument,
        categories,
        deleteDocument,
        fetchDetailDocument,
    };
}
//# sourceMappingURL=document.js.map