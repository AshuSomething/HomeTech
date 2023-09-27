using AutoMapper;
using HomeTech.Services.AcceptedRequestApi.Model;
using HomeTech.Services.AcceptedRequestApi.Model.Dto;

namespace HomeTech.Services.AcceptedRequestApi
{
	
		public class MappingConfig
		{
			public static MapperConfiguration RegisterMaps()
			{
				var mappingConfig = new MapperConfiguration(config =>
				{
					config.CreateMap<AcceptRequestDto, AcceptRequest>();
					config.CreateMap<AcceptRequest, AcceptRequestDto>();
				});
				return mappingConfig;
			}
		}
	
}
