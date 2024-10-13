
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Fragment } from 'react'

export default function About() {
  const commonT = useTranslations('Common')
    return (
      <Fragment>
        <div className="breadcrumb-option">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb__links">
                            <Link href="/" title={commonT("home")}><i className="fa fa-home"></i> {commonT("home")}</Link>
                            <span>{commonT("about")}</span>
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
                        {commonT('about')}
                      </h1>
                      <h3 className='text-lg md:text-xl text-white'>
                        Chơi nhiều games hay, hấp dẫn và miễn phí mọi lúc, mọi nơi 
                      </h3>
                    </div>
                  </section>
                  <section className='py-12 md:py-20 lg:py-24 px-4'>
                    <div className='space-y-8'>
                      <div>
                        <h2 className='text-3xl font-bold'>Câu chuyện của chúng tôi</h2>
                        <p className='text-muted-foreground leading-8'>
                        Chúng tôi bắt đầu với niềm đam mê sâu sắc dành cho thế giới game, 
                        mong muốn mang đến cho cộng đồng game thủ một sân chơi phong phú và đa dạng. 
                        Website của chúng tôi là nơi tập hợp những tựa game hấp dẫn nhất, từ các 
                        trò chơi cổ điển đến những siêu phẩm hiện đại, để đáp ứng nhu cầu của mọi game thủ.
                        </p>
                      </div>
                      <div>
                        <h2 className='text-3xl font-bold'>Giá trị của chúng tôi</h2>
                        <p className='text-muted-foreground leading-8'>
                        Chúng tôi tin tưởng vào sức mạnh của giải trí và sự kết nối qua game. 
                        Mỗi trò chơi không chỉ là phương tiện giải trí mà còn là cơ hội để phát triển kỹ năng, 
                        tư duy sáng tạo và gắn kết cộng đồng. Chúng tôi luôn đề cao tính công bằng, 
                        sự tôn trọng và niềm vui trong trải nghiệm của người chơi.
                        </p>
                      </div>
                      <div>
                        <h2 className='text-3xl font-bold'>Cam kết của chúng tôi</h2>
                        <p className='text-muted-foreground leading-8'>
                        Chúng tôi cam kết mang đến trải nghiệm chơi game chất lượng, đa dạng 
                        và an toàn cho tất cả người dùng. Đội ngũ chúng tôi không ngừng cải 
                        tiến nền tảng để đảm bảo rằng người chơi luôn có những giây phút giải 
                        trí tuyệt vời nhất, với những tựa game mới nhất và tính năng tối ưu nhất.
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