using StackExchange.Redis;

namespace CustomAPI.Configs;

public class CustomDB
{
	private readonly Config myCf;
	private readonly IConnectionMultiplexer cnMulti;
	public CustomDB(Config config)
	{
		myCf = config;
		cnMulti = ConnectionMultiplexer.Connect(myCf.REDIS.URL);
	}
	public IDatabase GetDatabase() => cnMulti.GetDatabase();
}