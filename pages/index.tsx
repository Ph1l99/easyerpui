import Head from 'next/head';
import { useAuth } from '../components/useAuth';
import { useEffect, useState } from 'react';
import SectionTitle from '../components/layout/sectionTitle';
import {
    ArticleDashboard,
    ArticleDashboardDetail,
    ArticleDetail,
    RepairDashboard,
    RepairDashboardDetail,
} from '../utils/types';
import useApi from '../components/useApi';
import { EASY_ERP_ARTICLES_URL, EASY_ERP_REPAIRS_URL } from '../utils/urls';
import clsx from 'clsx';
import useTranslation from '../components/useTranslation';
import { toastOnErrorApiResponse } from '../utils/toast';
import ArticleDashboardItem from '../components/layout/dashboard/articleDashboardItem';
import Modal from '../components/layout/modal';

export default function Home() {
    const { user, getProfileInfo } = useAuth();
    const { authAxios } = useApi();
    const { t } = useTranslation();

    const [articlesDashboard, setArticlesDashboard] =
        useState<ArticleDashboard>({});
    const [repairsDashboard, setRepairsDashboard] = useState<RepairDashboard>(
        {}
    );
    const [isArticleDashboardModalOpen, setIsArticleDashboardModalOpen] =
        useState(false);
    const [itemsDashboardModal, setItemsDashboardModal] = useState<
        Array<ArticleDetail>
    >([]);
    const [articleDashboardModalTitle, setArticleDashboardModalTitle] =
        useState('');

    const openModalDashboardArticle = function (
        modalTitle: string,
        items: Array<ArticleDetail>
    ) {
        setItemsDashboardModal(items);
        setArticleDashboardModalTitle(modalTitle);
        setIsArticleDashboardModalOpen(true);
    };
    const closeModal = function () {
        setIsArticleDashboardModalOpen(false);
        setArticleDashboardModalTitle('');
        setItemsDashboardModal([]);
    };

    const loadArticlesDashboard = function () {
        authAxios
            .get(`${EASY_ERP_ARTICLES_URL}/dashboard`)
            .then(response => {
                setArticlesDashboard(response.data);
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.home.api.getArticleDashboardError
                );
            });
    };

    const loadRepairsDashboard = function () {
        authAxios
            .get(`${EASY_ERP_REPAIRS_URL}dashboard`)
            .then(response => {
                setRepairsDashboard(response.data);
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.home.api.getRepairDashboardError
                );
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
                <SectionTitle title={`${t.home.welcome}, ${user?.firstName}`} />
            </main>

            <div className="flex flex-col px-2 h-[calc(100vh-19rem)]">
                <div className="basis-4/12">
                    <div className="basis-1/12 py-2 font-bold text-xl">
                        {t.home.repairs}
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
                    <div className="basis-1/12 py-2 font-bold text-xl">
                        {t.home.articles}
                    </div>
                    <div className="flex flex-row w-full gap-2.5 mt-3">
                        {articlesDashboard.dashboard?.map(
                            (articleDashboard: ArticleDashboardDetail) => (
                                <ArticleDashboardItem
                                    key={articleDashboard.label!}
                                    label={articleDashboard.label!}
                                    value={articleDashboard.value!}
                                    isClickEnabled={
                                        articleDashboard.items?.length! > 0
                                    }
                                    openModalDetail={() => {
                                        openModalDashboardArticle(
                                            articleDashboard.label!,
                                            articleDashboard.items!
                                        );
                                    }}
                                />
                            )
                        )}
                    </div>
                </div>
                <Modal
                    isOpen={isArticleDashboardModalOpen}
                    title={articleDashboardModalTitle}
                    onClose={closeModal}
                >
                    {itemsDashboardModal.map((article: ArticleDetail) => (
                        <div
                            className="flex justify-between px-2"
                            key={article.barcode}
                        >
                            <div className="basis-6/12">{article.name}</div>
                            <div className="basis-6/12 flex justify-end">
                                {`${t.warehouse.inventory.row.currentAvailability}: `}
                                {article.current_availability}
                            </div>
                        </div>
                    ))}
                </Modal>
            </div>
        </>
    );
}
