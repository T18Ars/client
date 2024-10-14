import { Link } from "@/i18n/routing";
import { getTranslations } from 'next-intl/server'
import { Fragment } from 'react'

export default async function TermsOfService({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  const commonT = await getTranslations({ locale, namespace: 'Common' })
    return (
      <Fragment>
        <div className="breadcrumb-option">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb__links">
                            <Link href="/" title={commonT("home")}><i className="fa fa-home"></i> {commonT("home")}</Link>
                            <span>{commonT("termOfService")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section className="product-page spad a_pp_tos">
          <div className="container">
            <div className="col-lg-12 py-3" style={{backgroundColor: '#f4f5f7'}}>
              <div className="card" style={{borderRadius: '.5rem'}}>
                <div className='flex flex-col'>
                  <section className='py-20 px-4 md:px-6 lg:px-8' style={{backgroundColor: '#0b0c2a', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem'}}>
                    <div className='text-center'>
                      <h1 className='text-4xl font-bold sm:text-5xl md:text-6xl text-white'>
                        {commonT('termOfService')}
                      </h1>
                    </div>
                  </section>
                  <section className='py-12 md:py-20 lg:py-24 px-4'>
                    <div className='space-y-8'>
                      <div>
                        <h2 className='text-3xl font-bold'>Giới thiệu</h2>
                        <p className='text-muted-foreground leading-8'>
                        Chào mừng bạn đến với website chơi game của chúng tôi! Trước khi sử dụng các dịch vụ của chúng tôi, vui lòng đọc kỹ các Điều khoản Dịch vụ dưới đây. Bằng cách sử dụng website, bạn đồng ý tuân thủ các điều khoản này.
                        </p>
                      </div>
                      <div>
                        <h2 className='text-3xl font-bold'>Chấp nhận điều khoản</h2>
                        <p className='text-muted-foreground leading-8'>
                        Khi truy cập và sử dụng các dịch vụ trên website, bạn đồng ý tuân thủ tất cả các điều khoản và điều kiện được nêu ra trong Điều khoản Dịch vụ này.
                        </p>
                      </div>
                      <div>
                        <h2 className='text-3xl font-bold'>Tài khoản người dùng</h2>
                        <p className='text-muted-foreground leading-8'>
                        Người dùng có trách nhiệm bảo mật thông tin tài khoản, bao gồm cả mật khẩu. Mọi hành vi vi phạm bảo mật hoặc sử dụng tài khoản trái phép cần được thông báo ngay lập tức cho chúng tôi.
                        </p>
                      </div>
                      <div>
                        <h2 className='text-3xl font-bold'>Quy định sử dụng dịch vụ</h2>
                        <p className='text-muted-foreground leading-8'>
                        Người dùng không được phép sử dụng website vào các mục đích vi phạm pháp luật, quấy rối, lạm dụng, gây hại hoặc phát tán nội dung không phù hợp. Chúng tôi có quyền tạm ngưng hoặc chấm dứt tài khoản của người dùng vi phạm mà không cần thông báo trước.
                        </p>
                      </div>
                      <div>
                        <h2 className='text-3xl font-bold'>Nội dung và quyền sở hữu</h2>
                        <p className='text-muted-foreground leading-8'>
                        Tất cả các nội dung trên website, bao gồm nhưng không giới hạn ở văn bản, hình ảnh, âm thanh, và các tựa game đều thuộc quyền sở hữu của chúng tôi hoặc các đối tác liên quan. Bạn không được phép sao chép, phát tán, hoặc sử dụng nội dung này mà không có sự cho phép.
                        </p>
                      </div>
                      <div>
                        <h2 className='text-3xl font-bold'>Bảo mật thông tin</h2>
                        <p className='text-muted-foreground leading-8'>
                        Chúng tôi cam kết bảo vệ thông tin cá nhân của người dùng theo Chính sách Bảo mật đã được nêu ra và tuân thủ các quy định bảo mật dữ liệu hiện hành.
                        </p>
                      </div>
                      <div>
                        <h2 className='text-3xl font-bold'>Thay đổi dịch vụ</h2>
                        <p className='text-muted-foreground leading-8'>
                        Chúng tôi có quyền thay đổi, cập nhật hoặc chấm dứt bất kỳ phần nào của dịch vụ mà không cần thông báo trước. Người dùng có trách nhiệm theo dõi các cập nhật mới nhất từ chúng tôi.
                        </p>
                      </div>
                      <div>
                        <h2 className='text-3xl font-bold'>Giới hạn trách nhiệm</h2>
                        <p className='text-muted-foreground leading-8'>
                        Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh từ việc sử dụng website, bao gồm nhưng không giới hạn ở các sự cố kỹ thuật, mất mát dữ liệu, hoặc lỗi kết nối.
                        </p>
                      </div>
                      <div>
                        <h2 className='text-3xl font-bold'>Thay đổi điều khoản</h2>
                        <p className='text-muted-foreground leading-8'>
                        Chúng tôi có quyền cập nhật và thay đổi Điều khoản Dịch vụ này bất kỳ lúc nào. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website, và người dùng có trách nhiệm kiểm tra các cập nhật thường xuyên.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
      
    )
  }