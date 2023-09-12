using AutoMapper;
using HomeTech.Services.ComplaintAPI.Data;
using HomeTech.Services.ComplaintAPI.Models;
using HomeTech.Services.ComplaintAPI.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeTech.Services.ComplaintAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ComplaintAPIController : ControllerBase
	{
		private readonly AppDbContext _db;
		private readonly ResponseDTO response;
		private IMapper _mapper;

		public ComplaintAPIController(AppDbContext db,IMapper mapper)
		{
			_db = db;
			_mapper = mapper;
			response = new ResponseDTO();
		}
		[HttpGet]
		public ResponseDTO GetAllComlpaints()
		{
			try
			{
				IEnumerable<Complaint> objList = _db.Complaints.ToList();
				response.Result = _mapper.Map<IEnumerable<ComplaintDTO>>(objList);

			}
			catch (Exception e)
			{
				response.IsSuccess = false;
				response.Message = e.Message;

			}
			return response;
		}
		[HttpGet]
		[Route("{id:int}")]
		public ResponseDTO GetComplaintById(int id)
		{
			try
			{
				Complaint obj = _db.Complaints.First(u=>u.ComplaintID==id);
				response.Result = _mapper.Map<ComplaintDTO>(obj);
				

			}
			catch (Exception e)
			{
				response.IsSuccess = false;
				response.Message = e.Message;

			}
			return response;
		}
		[HttpGet]
		[Route("GetByCategory/{category}")]
		public ResponseDTO GetComaplaintByCategory(string category)
		{
			try
			{
				Complaint obj = _db.Complaints.First(u => u.Category.ToLower() == category.ToLower());
				response.Result = _mapper.Map<ComplaintDTO>(obj);
			}
			catch (Exception e)
			{
				response.IsSuccess = false;
				response.Message = e.Message;

			}
			return response;
		}
		[HttpPost]
		public ResponseDTO CreateComaplint([FromBody] ComplaintDTO complaintDTO)
		{
			try
			{
				Complaint obj = _mapper.Map<Complaint>(complaintDTO);
				_db.Complaints.Add(obj);
				_db.SaveChanges();

				response.Result = _mapper.Map<ComplaintDTO>(obj);
			}
			catch (Exception e)
			{
				response.IsSuccess = false;
				response.Message = e.Message;

			}
			return response;
		}
		[HttpPut]

		public ResponseDTO UpdateComplaint([FromBody] ComplaintDTO complaintDTO)
		{
			try
			{
				Complaint obj = _mapper.Map<Complaint>(complaintDTO);
				_db.Complaints.Update(obj);
				_db.SaveChanges();

				response.Result = _mapper.Map<ComplaintDTO>(obj);
			}
			catch (Exception e)
			{
				response.IsSuccess = false;
				response.Message = e.Message;

			}
			return response;
		}

		[HttpDelete]
		public ResponseDTO RemoveComplaint(int id)
		{
			try
			{
				Complaint obj = _db.Complaints.First(u=>u.ComplaintID==id);
				_db.Complaints.Remove(obj);
				_db.SaveChanges();
			}
			catch (Exception e)
			{
				response.IsSuccess = false;
				response.Message = e.Message;

			}
			return response;
		}

	}
}
