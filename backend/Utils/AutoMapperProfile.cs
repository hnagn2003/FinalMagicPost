namespace CustomAPI.Utils;

using AutoMapper;
using CustomAPI.Models;
using CustomAPI.Enums;

public class AutoMapperProfile : Profile
{
	private bool IgnoreNullAndEmptyString(object src, object dest, object prop)
	{
		// ignore both null && enpty string properties
		if (prop == null) return false;
		if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

		return true;
	}
	public AutoMapperProfile()
	{
		// RegisterModel -> User
		CreateMap<RegisterModel, User>();
		// CreateUserModel -> User
		CreateMap<CreateUserModel, User>();
		// LoginModel -> User
		CreateMap<LoginModel, User>();
		// UpdateUserModel -> User
		CreateMap<UpdateUserModel, User>()
				.ForAllMembers(x => x.Condition(IgnoreNullAndEmptyString));
		// CreatePointModel -> Point
		CreateMap<CreatePointModel, Point>();
		// UpdatePointModel -> Point
		CreateMap<UpdatePointModel, Point>()
				.ForAllMembers(x => x.Condition(IgnoreNullAndEmptyString));
		// CreateShipmentModel -> Shipment
		CreateMap<CreateShipmentModel, Shipment>()
				.ForMember(order => order.SenderName, opt => opt.MapFrom(createModel => createModel.Sender.Name))
				.ForMember(order => order.SenderAddress, opt => opt.MapFrom(createModel => createModel.Sender.Address.Name))
				.ForMember(order => order.SenderPrimary_Address, opt => opt.MapFrom(createModel => createModel.Sender.Address.Lat))
				.ForMember(order => order.SenderSecondary_Address, opt => opt.MapFrom(createModel => createModel.Sender.Address.Long))
				.ForMember(order => order.SenderProvince, opt => opt.MapFrom(createModel => createModel.Sender.Address.Province))
				.ForMember(order => order.SenderDistrict, opt => opt.MapFrom(createModel => createModel.Sender.Address.District))
				.ForMember(order => order.SenderWard, opt => opt.MapFrom(createModel => createModel.Sender.Address.Ward))
				.ForMember(order => order.SenderPhone, opt => opt.MapFrom(createModel => createModel.Sender.Phone))
				.ForMember(order => order.ReceiverName, opt => opt.MapFrom(createModel => createModel.Receiver.Name))
				.ForMember(order => order.ReceiverAddress, opt => opt.MapFrom(createModel => createModel.Receiver.Address.Name))
				.ForMember(order => order.ReceiverPrimary_Address, opt => opt.MapFrom(createModel => createModel.Receiver.Address.Lat))
				.ForMember(order => order.ReceiverSecondary_Address, opt => opt.MapFrom(createModel => createModel.Receiver.Address.Long))
				.ForMember(order => order.ReceiverProvince, opt => opt.MapFrom(createModel => createModel.Receiver.Address.Province))
				.ForMember(order => order.ReceiverDistrict, opt => opt.MapFrom(createModel => createModel.Receiver.Address.District))
				.ForMember(order => order.ReceiverWard, opt => opt.MapFrom(createModel => createModel.Receiver.Address.Ward))
				.ForMember(order => order.ReceiverPhone, opt => opt.MapFrom(createModel => createModel.Receiver.Phone))
				.ForMember(order => order.Items, opt => opt.MapFrom(createModel => createModel.PackageInfo.Items))
				.ForMember(order => order.Type, opt => opt.MapFrom(createModel => createModel.PackageInfo.Type))
				.ForMember(order => order.Properties, opt => opt.MapFrom(createModel => string.Join("-", createModel.PackageInfo.Properties)))
				.ForMember(order => order.Cod, opt => opt.MapFrom(createModel => createModel.ExtraData.Cod))
				.ForMember(order => order.Payer, opt => opt.MapFrom(createModel => createModel.ExtraData.Payer == "sender" ? Payment.SENDER : Payment.RECEIVER))
				.ForMember(order => order.Note, opt => opt.MapFrom(createModel => createModel.ExtraData.Note));
		// UpdateShipmentModel -> Shipment
		CreateMap<UpdateShipmentModel, Shipment>()
				.ForAllMembers(x => x.Condition(IgnoreNullAndEmptyString));
		// CreateShippingModel -> Shipping
		CreateMap<CreateShippingModel, Shipping>();
	}
}