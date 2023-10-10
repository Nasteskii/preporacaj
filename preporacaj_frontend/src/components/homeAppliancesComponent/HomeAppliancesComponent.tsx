import TableComponent from "../tableComponent/TableComponent";

function HomeAppliancesComponent() {
  return (
    <div className="bg-silver w-full pt-12 pb-32 overflow-auto">
      <div className="text-center text-3xl mb-12 text-purple">Домаќинство</div>
      <TableComponent />
    </div>
  );
}

export default HomeAppliancesComponent;
