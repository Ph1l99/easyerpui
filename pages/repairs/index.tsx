import SectionTitle from '../../components/layout/sectionTitle';
import SearchAdd from '../../components/layout/searchAdd';
import { useRouter } from 'next/router';
import { EASY_ERP_REPAIR_URL } from '../../utils/urls';

export default function Repairs() {
    const router = useRouter();
    const navigateToRepairPage = function (barcode: string) {
        if (barcode)
            router.push(
                EASY_ERP_REPAIR_URL.replace('{REPAIR_BARCODE}', barcode)
            );
    };
    const openNewRepairPage = function () {
        navigateToRepairPage('-1');
    };
    const searchRepair = function (input: string) {
        console.log('Searching ', input); // todo
    };
    return (
        <>
            <SectionTitle title="Riparazioni"></SectionTitle>
            <SearchAdd
                addItem={openNewRepairPage}
                searchItem={searchRepair}
            ></SearchAdd>
        </>
    );
}
