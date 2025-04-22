// // import '@ant-design/v5-patch-for-react-19';
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import Header from '@components/common/Header';
// import Navigation from "@components/common/Navigation";
// import Script from 'next/script';
// import StyledComponentsRegistry from '../lib/AntdRegistry';
// import { ConfigProvider } from 'antd';
// import '@styles/global.css';

// const inter = Inter({ subsets: ['latin'] });
// const KAKAO_MAPS_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY as string;

// export const metadata: Metadata = {
//   title: `Beom'story - 당신의 특별한 일상을 기록하세요`,
//   description: '특별한 순간을 기록하고 관리하는 일상 기록 서비스',
// };

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//       <html lang="en">
//           <body className={inter.className}>
//             <Script
//               async
//               type='text/javascript'
//               src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAPS_API_KEY}&libraries=services,clusterer&autoload=false`}
//             ></Script>
//             <StyledComponentsRegistry>
//               <ConfigProvider
//                 theme={{
//                   token: {
//                     colorPrimary: '#4a90e2',
//                     // colorPrimary: '#bae0ff',
//                   },
//                 }}
//               >
//                 <Header />
//                 <main>
//                   {children}
//                 </main>
//                 {/* 푸터 컴포넌트를 여기에 추가*/}
//               </ConfigProvider>
//             </StyledComponentsRegistry>
//         </body>
//       </html>
//   );
// }
// import '@ant-design/v5-patch-for-react-19';
import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: `Beom'story - 당신의 특별한 일상을 기록하세요`,
  description: "특별한 순간을 기록하고 관리하는 일상 기록 서비스",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>
}

