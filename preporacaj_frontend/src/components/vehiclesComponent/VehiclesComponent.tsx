import TableComponent from "../tableComponent/TableComponent";

function VehiclesComponent() {
  return (
    <div className="bg-silver w-full pt-12 pb-32 overflow-auto">
      <div className="text-center text-3xl mb-12 text-purple">Возила</div>
      <TableComponent />
    </div>
  );
}

export default VehiclesComponent;
