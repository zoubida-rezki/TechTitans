
import AdminView from './admin/page';

async function extractAllDatas(currentSection) {
  const res = await fetch(`http://localhost:3000/api/${currentSection}/get`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  return data && data.data;
}

export default async function Home() {
  const homeSectionData = await extractAllDatas("home");
  // const aboutSectionData = await extractAllDatas("about");
  // const experienceSectionData = await extractAllDatas("experience");
  // const educationSectionData = await extractAllDatas("education");
  // const projectSectionData = await extractAllDatas("project");

  return (
    <div>
      <AdminView/>
    </div>
  );
}