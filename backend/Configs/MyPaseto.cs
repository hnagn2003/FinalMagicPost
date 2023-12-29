using System.Text;
using Paseto.Builder;
using Paseto;

namespace CustomAPI.Configs;

public class MyPaseto
{
	private readonly Config myCf;
	private static PasetoBuilder Builder() => new PasetoBuilder().UseV4(Purpose.Local);
	public MyPaseto(Config config)
	{
		myCf = config;
	}
	public string Encode(object payload, string secret)
	{
		if (myCf.TOKEN.SECRET == null)
			throw new NullReferenceException("Token secret cannot null");
		var encodePassword = Encoding.ASCII.GetBytes(secret);
		return Builder().WithKey(encodePassword, Encryption.SymmetricKey).AddClaim("value", payload).Encode();
	}

	public PasetoTokenValidationResult Decode(string token, string secret)
	{
		if (myCf.TOKEN.SECRET == null)
			throw new NullReferenceException("Token secret cannot null");
		var decodePassword = Encoding.ASCII.GetBytes(secret);
		return Builder().WithKey(decodePassword, Encryption.SymmetricKey).Decode(token);
	}
}