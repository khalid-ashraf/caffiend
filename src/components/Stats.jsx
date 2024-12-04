import {
  calculateCoffeeStats,
  calculateCurrentCaffeineLevel,
  coffeeConsumptionHistory,
  getTopThreeCoffees,
  statusLevels,
} from "../utils";

const Stats = () => {
  const stats = calculateCoffeeStats(coffeeConsumptionHistory);

  const caffeineLevel = calculateCurrentCaffeineLevel(coffeeConsumptionHistory);
  const warningLevel =
    caffeineLevel < statusLevels["low"].maxLevel
      ? "low"
      : caffeineLevel < statusLevels["moderate"].maxLevel
      ? "moderate"
      : "high";

  return (
    <>
      <section className='section-header'>
        <i className='fa-solid fa-chart-simple' />
        <h2>Stats</h2>
      </section>

      <div className='stats-grid'>
        <StatsCard
          lg
          title='Active Caffeine Level'
        >
          <div className='status'>
            <p>
              <span className='stat-text'>{caffeineLevel}</span> mg
            </p>
            <h5
              style={{
                color: statusLevels[warningLevel].color,
                background: statusLevels[warningLevel].background,
              }}
            >
              Low
            </h5>
          </div>
          <p>{statusLevels[warningLevel].description}</p>
        </StatsCard>

        <StatsCard title='Daily Caffeine'>
          <p>
            <span className='stat-text'>{stats.daily_caffeine}</span> mg
          </p>
        </StatsCard>

        <StatsCard title='Avg # of Coffees'>
          <p>
            <span className='stat-text'>{stats.average_coffees}</span>
          </p>
        </StatsCard>

        <StatsCard title='Daily Cost'>
          <p>
            $ <span className='stat-text'>{stats.daily_cost}</span>
          </p>
        </StatsCard>

        <StatsCard title='Total Cost'>
          <p>
            $ <span className='stat-text'>{stats.total_cost}</span>
          </p>
        </StatsCard>

        <table className='stat-table'>
          <thead>
            <tr>
              <th>Coffee Name</th>
              <th>Number of Purchases</th>
              <th>Percentage of Total</th>
            </tr>
          </thead>
          <tbody>
            {getTopThreeCoffees(coffeeConsumptionHistory).map(
              (coffee, coffeeIndex) => {
                return (
                  <tr key={coffeeIndex}>
                    <td>{coffee.coffeeName}</td>
                    <td>{coffee.count}</td>
                    <td>{coffee.percentage}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Stats;

const StatsCard = ({ lg, title, children }) => {
  return (
    <div className={"card stat-card " + (lg && "col-span-2")}>
      <h4>{title}</h4>
      {children}
    </div>
  );
};
