using AutoMapper;
using Azure;
using HomeTech.Services.ComplaintAPI.Data;
using HomeTech.Services.ComplaintAPI.Models;
using HomeTech.Services.ComplaintAPI.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeTech.Services.ComplaintAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
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
		public IActionResult GetAllComlpaints()
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
			return Ok(response);
		}
		[HttpGet]
		[Route("Complaint/ComplaintId")]
		public IActionResult GetCaomplintByComplaintId(int complaintId)
		{
			try
			{
				// Assuming that ComplaintId is a unique identifier.
				Complaint request = _db.Complaints.FirstOrDefault(u => u.ComplaintID == complaintId);

				if (request != null)
				{
					response.Result = _mapper.Map<ComplaintDTO>(request);
				}
				else
				{
					response.IsSuccess = false;
					response.Message = "No AcceptRequest found for the specified ComplaintId.";
				}
			}
			catch (Exception ex)
			{
				response.IsSuccess = false;
				response.Message = ex.Message;
			}
			return Ok(response);
		}


		[HttpGet]
		[Route("{Customer}")]
		public IActionResult GetComplaintById(String Customer)
		{
			try
			{
                IEnumerable<Complaint> objList = _db.Complaints.Where(c => c.CustomerId == Customer).ToList();
                response.Result = _mapper.Map<IEnumerable<ComplaintDTO>>(objList);


            }
			catch (Exception e)
			{
				response.IsSuccess = false;
				response.Message = e.Message;

			}
			return Ok(response);
		}



		/*[HttpGet]
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
		}*/



		[HttpPost]
		public IActionResult CreateComplaint([FromBody] ComplaintDTO complaintDTO)
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
			return Ok(response);
		}


		[HttpPut]

		public IActionResult UpdateComplaint([FromBody] ComplaintDTO complaintDTO)
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
            return Ok(response);
		}



		[HttpDelete]
		public IActionResult RemoveComplaint(int id)
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
			return Ok(response);
		}

	}
}
