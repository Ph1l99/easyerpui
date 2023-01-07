import Head from 'next/head';
import { useAuth } from '../components/useAuth';
import { useEffect, useState } from 'react';
import SectionTitle from '../components/layout/sectionTitle';
import {
    ArticleDashboard,
    RepairDashboard,
    RepairDashboardDetail,
} from '../utils/types';
import useApi from '../components/useApi';
import { EASY_ERP_ARTICLES_URL, EASY_ERP_REPAIRS_URL } from '../utils/urls';
import toast from 'react-hot-toast';
import clsx from 'clsx';

export default function Home() {
    const { user, getProfileInfo } = useAuth();
    const api = useApi();

    const [articlesDashboard, setArticlesDashboard] =
        useState<ArticleDashboard>({});
    const [repairsDashboard, setRepairsDashboard] = useState<RepairDashboard>(
        {}
    );

    const loadArticlesDashboard = function () {
        api.authAxios
            .get(`${EASY_ERP_ARTICLES_URL}/dashboard`)
            .then(response => {
                setArticlesDashboard(response.data);
            })
            .catch(() => {
                toast.error('Error'); // todo internationalization
            });
    };

    const loadRepairsDashboard = function () {
        api.authAxios
            .get(`${EASY_ERP_REPAIRS_URL}dashboard`)
            .then(response => {
                setRepairsDashboard(response.data);
            })
            .catch(() => {
                toast.error('Error'); // todo internationalization
            });
    };

    useEffect(() => {
        getProfileInfo();
        loadArticlesDashboard();
        loadRepairsDashboard();
    }, []);

    return (
        <>
            <Head>
                <title>Easy ERP</title>
                <meta name="description" content="Easy ERP" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <SectionTitle title={`Benvenuto, ${user?.firstName}`} />
            </main>

            <div className="flex flex-col px-2">
                <div className="basis-6/12">
                    <div className="basis-1/12 py-2 text-bold text-xl">
                        Riparazioni
                    </div>
                    <div className="flex flex-row w-full gap-2.5">
                        {repairsDashboard.dashboard?.map(
                            (repairDashboardDetail: RepairDashboardDetail) => (
                                <div
                                    className={clsx(
                                        'bg-' +
                                            repairDashboardDetail.status_class,
                                        'w-1/4 flex rounded-lg text-white text-xl text-center capitalize justify-items-center justify-around p-2.5 h-fit'
                                    )}
                                    key={repairDashboardDetail.status_id}
                                >
                                    <span className="font-bold">
                                        {repairDashboardDetail.total_repairs}
                                    </span>
                                    <span>{repairDashboardDetail.status}</span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
