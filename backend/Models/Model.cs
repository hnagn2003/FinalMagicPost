using CustomAPI.Enums;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;

namespace CustomAPI.Models;

public class Model
{
	public string Repr() => JsonConvert.SerializeObject(this);
}

public class DataNavigation<T>
{
	public int DataCount { get; set; }
	public int PageNumber { get; set; }
	public int TotalPage { get; set; }
	public int PageSize { get; set; } = (int)Navigation.PAGESIZE;
	public List<T> Data { get; set; } = new List<T>();
	public DataNavigation(List<T> Data, int DataCount, int PageNumber)
	{
		this.Data = Data;
		this.DataCount = DataCount;
		this.PageNumber = PageNumber;
		TotalPage = (int)Math.Ceiling((double)DataCount / PageSize);
	}
	public DataNavigation(List<T> Data, int DataCount, int PageNumber, int PageSize)
	{
		this.Data = Data;
		this.DataCount = DataCount;
		this.PageNumber = PageNumber;
		TotalPage = (int)Math.Ceiling((double)(DataCount / PageSize));
	}
	public DataNavigation() { }
}

public static class ModelHelper
{
	public static async Task ForEachAsync<T>(this List<T> list, Func<T, Task> func)
	{
		foreach (var value in list)
		{
			await func(value);
		}
	}
}