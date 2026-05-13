import TopNavBar from '../TopNavBar';
import AspirasiHeader from './AspirasiHeader';
import AspirasiForm from './AspirasiForm';
import AspirasiInfo from './AspirasiInfo';
import AspirasiFooter from './AspirasiFooter';

export default function AspirasiPage() {
  return (
    <>
      <TopNavBar />
      <main className="pt-32 pb-20 px-6 max-w-screen-2xl mx-auto">
        <AspirasiHeader />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <AspirasiForm />
          <AspirasiInfo />
        </div>
      </main>
      <AspirasiFooter />
    </>
  );
}
