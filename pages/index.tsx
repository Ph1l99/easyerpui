import Head from 'next/head';
import { useAuth } from '../components/useAuth';
import { useEffect, useState } from 'react';
import SectionTitle from '../components/layout/sectionTitle';
import {
    ArticleDashboard,
    ArticleDashboardDetail,
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

            <div className="flex flex-col px-2 h-[calc(100vh-19rem)]">
                <div className="basis-4/12">
                    <div className="basis-1/12 py-2 text-bold text-xl">
                        Riparazioni
                    </div>
                    <div className="flex flex-row w-full gap-2.5 mt-3">
                        {repairsDashboard.dashboard?.map(
                            (repairDashboardDetail: RepairDashboardDetail) => (
                                <div
                                    className={clsx(
                                        'bg-' +
                                            repairDashboardDetail.status_class,
                                        'w-1/4 flex rounded-lg text-white text-xl text-center uppercase justify-around p-2.5 h-fit'
                                    )}
                                    key={repairDashboardDetail.status_id}
                                >
                                    <div className="font-bold">
                                        {repairDashboardDetail.total_repairs}
                                    </div>
                                    <div>{repairDashboardDetail.status}</div>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="basis-4/12">
                    <div className="basis-1/12 py-2 text-bold text-xl">
                        Articoli
                    </div>
                    <div className="flex flex-row w-full gap-2.5 mt-3">
                        {articlesDashboard.dashboard?.map(
                            (articleDashboard: ArticleDashboardDetail) => (
                                <div
                                    className="bg-red-400 w-1/3 flex rounded-lg text-white text-xl uppercase justify-around p-2.5 h-fit"
                                    key={articleDashboard.label}
                                >
                                    <div className="font-bold">
                                        {articleDashboard.value}
                                    </div>
                                    <div className="text-left">
                                        {articleDashboard.label}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
