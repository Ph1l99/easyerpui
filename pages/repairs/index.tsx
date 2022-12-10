import SectionTitle from '../../components/layout/sectionTitle';
import SearchAdd from '../../components/layout/searchAdd';
import { useRouter } from 'next/router';
import { EASY_ERP_REPAIR_URL } from '../../utils/urls';
import RepairRow from '../../components/layout/repair/repairRow';

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
    const deleteRepair = function (barcode: string) {
        console.log('Delete');
    };
    return (
        <>
            <SectionTitle title="Riparazioni"></SectionTitle>
            <SearchAdd
                addItem={openNewRepairPage}
                searchItem={searchRepair}
            ></SearchAdd>
            <RepairRow
                repair={{
                    title: 'Aspirapolvere cinese',
                    delivery_date: new Date(),
                    status: {
                        id: 1,
                        status: 'DA LAVORARE',
                        is_active: true,
                    },
                }}
                navigateToRepairPage={navigateToRepairPage}
                deleteRepair={deleteRepair}
            ></RepairRow>
        </>
    );
}
