
import { Link } from "@/i18n/routing";
import { Fragment, cache } from 'react'
import { wrapServerApi } from '@/lib/utils';
import categoriesApiRequest from "@/apiRequests/categories";
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

const getAllCategories = cache((slug: string) =>
    wrapServerApi(() => categoriesApiRequest.getAllCategories())
)

type Props = {
    params: { slug: string, locale: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function AllCategories({params} : Props) {
  const commonT = await getTranslations({ locale: params.locale, namespace: 'Common' })
  const data = await getAllCategories(params.locale)
  const cateList = data?.payload
  
    return (
        <Fragment>
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link href="/" title={commonT("home")}><i className="fa fa-home"></i> {commonT("home")}</Link>
                                <span>All Categories</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="product-page spad">
                <div className="container">
                    <div className="row allcategories">
                    {cateList?.map((cate: any) => (
                        <div className="col-lg-12 mb-4" key={cate.slug}>
                            <div className="product__page__content">
                                <div className="product__page__title mt-2">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="section-title">
                                                <Link href={`/${cate.slug}`}>{cate.ten}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {cate?.children && cate?.children?.map((child: any) => (
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 item_cate" key={child.slug}>
                                        <Link href={`/${child.slug}`}>{child.ten}</Link>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
      </Fragment>
      
    )
  }