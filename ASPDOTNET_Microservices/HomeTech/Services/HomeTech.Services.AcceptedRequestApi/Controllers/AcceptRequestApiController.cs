using AutoMapper;
using HomeTech.Services.AcceptedRequestApi.Data;
using HomeTech.Services.AcceptedRequestApi.Model;
using HomeTech.Services.AcceptedRequestApi.Model.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Azure.Core.HttpHeader;

namespace HomeTech.Services.AcceptedRequestApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AcceptRequestApiController : ControllerBase
	{

		private readonly AppDbContext _db;
		private ResponseDto _response;
		private IMapper _mapper;

		public AcceptRequestApiController(AppDbContext db, IMapper mapper)
		{
			_db = db;
			_mapper = mapper;
			_response = new ResponseDto();
		}
		
	/*	[HttpGet]
		[Route("{id:int}")]
		public object GetRequestById(int id)
		{
			try
			{
                Model.AcceptRequest objList = _db.AcceptRequests.First(u => u.AcceptRequestId == id);
				return objList;
			}
			catch (Exception ex)
			{

			}
			return null;
		}*/

		[HttpGet]
		public IActionResult Get()
		{
			try
			{
				IEnumerable<Model.AcceptRequest> objList = _db.AcceptRequests.ToList();
				_response.Result = _mapper.Map<IEnumerable<AcceptRequestDto>>(objList);
			}
			catch (Exception ex)
			{
				_response.IsSuccess = false;
				_response.Message = ex.Message;
			}
			return Ok(_response);
		}

		/*[HttpGet]
		[Route("{id:int}")]
		public ResponseDto GetAcceptRequestById(int id)
		{
			try
			{
                Model.AcceptRequest obj = _db.AcceptRequests.First(u => u.Id == id);
				_response.Result = _mapper.Map<AcceptRequestDto>(obj);
			}
			catch (Exception ex)
			{
				_response.IsSuccess = false;
				_response.Message = ex.Message;
			}
			return _response;
		}*/

		/*[HttpGet]
		[Route("GetByCode/{code}")]
		public ResponseDto GetAcceptedRequstedByTechnicianId(string code)
		{
			try
			{
				//AcceptRequest obj = _db.AcceptRequests.First(u => u.AcceptRequestCode.ToLower() == code.ToLower());
				//_response.Result = _mapper.Map<AcceptRquestDto>(obj);
			}
			catch (Exception ex)
			{
				_response.IsSuccess = false;
				_response.Message = ex.Message;
			}
			return _response;
		}
*/

		[HttpPost]
		public IActionResult Post([FromBody] Model.Dto.AcceptRequestDto acceptRequestDto)
		{
			try
			{
                Model.AcceptRequest obj = _mapper.Map<Model.AcceptRequest>(acceptRequestDto);
				_db.AcceptRequests.Add(obj);
				_db.SaveChanges();

                _response.Result = _mapper.Map<Model.Dto.AcceptRequestDto>(obj);
			}
			catch (Exception ex)
			{
				_response.IsSuccess = false;
				_response.Message = ex.Message;
			}
			return Ok(_response);
		}


		[HttpPut]
		public ResponseDto Put([FromBody] Model.Dto.AcceptRequestDto acceptRequestDto)
		{
			try
			{
                Model.AcceptRequest obj = _mapper.Map<Model.AcceptRequest>(acceptRequestDto);
				_db.AcceptRequests.Update(obj);
				_db.SaveChanges();

				_response.Result = _mapper.Map<AcceptRequestDto>(obj);
			}
			catch (Exception ex)
			{
				_response.IsSuccess = false;
				_response.Message = ex.Message;
			}
			return _response;
		}
		[HttpDelete]
		[Route("{id:int}")]
		public ResponseDto Delete(int id)
		{
			try
			{

                Model.AcceptRequest obj = _db.AcceptRequests.First(u => u.Id == id);

				_db.AcceptRequests.Remove(obj);
				_db.SaveChanges();
			}
			catch (Exception ex)
			{
				_response.IsSuccess = false;
				_response.Message = ex.Message;
			}
			return _response;
		}
	}
}
