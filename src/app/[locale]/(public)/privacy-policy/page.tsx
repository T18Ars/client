import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Fragment } from 'react'

export default function PrivacyPolicy() {
  const commonT = useTranslations('Common')
    return (
      <Fragment>
        <div className="breadcrumb-option">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb__links">
                            <Link href="/" title={commonT("home")}><i className="fa fa-home"></i> {commonT("home")}</Link>
                            <span>{commonT("privacyPolicy")}</span>
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
                        {commonT('privacyPolicy')}
                      </h1>
                    </div>
                  </section>
                  <section className='py-12 md:py-20 lg:py-24 px-4'>
                    <div className='space-y-8'>
                      <p>Chúng tôi cam kết bảo vệ quyền riêng tư và bảo mật thông tin cá nhân 
                        của người dùng khi sử dụng website chơi game của chúng tôi. Chính sách 
                        bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ 
                        thông tin của bạn.</p>
                      <div>
                        <h2 className='text-3xl font-bold'>Thu thập thông tin cá nhân</h2>
                        <p className='text-muted-foreground leading-8'>
                        Chúng tôi chỉ thu thập các thông tin cần thiết như tên, địa chỉ email, 
                        và thông tin tài khoản để phục vụ mục đích quản lý tài khoản, hỗ trợ người 
                        dùng, và cung cấp các dịch vụ liên quan đến trải nghiệm chơi game của bạn.
                        </p>
                      </div>
                      <div>
                        <h2 className='text-3xl font-bold'>Sử dụng thông tin</h2>
                        <p className='text-muted-foreground leading-8'>
                        Chúng tôi sử dụng thông tin cá nhân của bạn để cải thiện trải nghiệm 
                        người dùng, cá nhân hóa nội dung, cung cấp các thông báo quan trọng 
                        về tài khoản và đảm bảo tính bảo mật cho hệ thống.
                        </p>
                      </div>
                      <div>
                        <h2 className='text-3xl font-bold'>Bảo vệ thông tin</h2>
                        <p className='text-muted-foreground leading-8'>
                        Chúng tôi áp dụng các biện pháp bảo mật tiên tiến nhằm bảo vệ thông tin 
                        của bạn khỏi truy cập trái phép, mất mát hoặc rò rỉ dữ liệu. Tất cả 
                        các giao dịch và thông tin cá nhân được mã hóa và lưu trữ an toàn.
                        </p>
                      </div>
                      <div>
                        <h2 className='text-3xl font-bold'>Chia sẻ thông tin</h2>
                        <p className='text-muted-foreground leading-8'>
                        Chúng tôi không chia sẻ thông tin cá nhân của bạn với bất kỳ bên thứ ba 
                        nào ngoại trừ khi có sự đồng ý của bạn hoặc khi cần thiết để tuân thủ 
                        các yêu cầu pháp lý.
                        </p>
                      </div>
                      <div>
                        <h2 className='text-3xl font-bold'>Quyền của người dùng</h2>
                        <p className='text-muted-foreground leading-8'>
                        Bạn có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa thông tin cá nhân bất 
                        kỳ lúc nào. Chúng tôi luôn sẵn sàng hỗ trợ để đảm bảo quyền riêng tư của 
                        bạn được bảo vệ tối đa.
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