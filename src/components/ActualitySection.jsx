import ActualityCard from "./ActualityCard"

const ActualitySection = () => {
  return (
    <div className="w-full flex flex-col items-center my-10">
      <div className="w-9/10 flex">
        <h1 className="text-4xl font-bold mb-6 text-text-primary">
          Actualités
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-9/10 flex flex-between">
          <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <ActualityCard />
            <ActualityCard />
            <ActualityCard />
            <ActualityCard />
            <ActualityCard />
            <ActualityCard />
            <ActualityCard />
            <ActualityCard />
            <ActualityCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActualitySection