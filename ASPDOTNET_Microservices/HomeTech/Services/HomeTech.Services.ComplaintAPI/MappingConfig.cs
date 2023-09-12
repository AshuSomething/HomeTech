using AutoMapper;
using HomeTech.Services.ComplaintAPI.Models;
using HomeTech.Services.ComplaintAPI.Models.DTO;

namespace HomeTech.Services.ComplaintAPI
{
	public class MappingConfig
	{
		public static MapperConfiguration RegisterMaps()
		{
			var mappingConfig = new MapperConfiguration(config =>
			{
				config.CreateMap<Complaint, ComplaintDTO>();
				config.CreateMap<ComplaintDTO, Complaint>();

			});
			return mappingConfig;
		}
	}
}
