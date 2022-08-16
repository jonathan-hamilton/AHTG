using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Hospitals;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace API.Controllers
{
    public class HospitalsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Hospital>>> GetHospitals()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hospital>> GetHospital(Guid id)
        {
            return await Mediator.Send(new Details.Query{ Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateHospital(Hospital hospital)
        {
            return Ok(await Mediator.Send(new Create.Command{ Hospital = hospital }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditHospital(Guid id, Hospital hospital)
        {
            hospital.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{ Hospital = hospital }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHospital(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{ Id = id }));
        }
    }
}