//package com.caretronics.reunioes.testcontroller;
//
//import com.caretronics.reunioes.controller.ReuniaoController;
//import static org.hamcrest.Matchers.hasSize;
//import static org.hamcrest.Matchers.is;
//import static org.mockito.Mockito.times;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.verifyNoMoreInteractions;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//import java.util.Arrays;
//import java.util.List;
//
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//import com.caretronics.reunioes.domain.Departamento;
//import com.caretronics.reunioes.domain.Reuniao;
//import com.caretronics.reunioes.service.ReuniaoService;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
//public class ReuniaoControllerTest {
//
//	private MockMvc mockMvc;
//	
//    @Mock
//    private ReuniaoService reuniaoService;
//    
//    @InjectMocks
//    private ReuniaoController reuniaoController;    
//
//    @Before
//    public void setup() {
//    	MockitoAnnotations.initMocks(this);
//        mockMvc = MockMvcBuilders
//                .standaloneSetup(reuniaoController)
//                .build();
//    }
//    
//    @Test
//    public void test_get_all_success() throws Exception {
//        List<Departamento> departamentos = Arrays.asList(new Departamento(1, "Engineering", "Engineering Department"),
//        		new Departamento(2, "Design", "Design Department"));
//    	
//        List<Reuniao> reuniaos = Arrays.asList(new Reuniao(1, "Revision", "Weekly Revision", departamentos),
//        		new Reuniao(2, "Scrum", "Scrum Meeting", departamentos));
//        
//        when(reuniaoService.list()).thenReturn(reuniaos);
//        
//        mockMvc.perform(get("/reuniaos"))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
//                .andExpect(jsonPath("$", hasSize(2)))
//                .andExpect(jsonPath("$[0].id", is(1)))
//                .andExpect(jsonPath("$[0].nome", is("Revision")))
//                .andExpect(jsonPath("$[1].id", is(2)))
//                .andExpect(jsonPath("$[1].nome", is("Scrum")));
//        
//        verify(reuniaoService, times(1)).list();
//        verifyNoMoreInteractions(reuniaoService);
//    }
//    
//    @Test
//    public void test_get_by_id_success() throws Exception {
//        List<Departamento> departamentos = Arrays.asList(new Departamento(1, "Engineering", "Engineering Department"),
//        		new Departamento(2, "Design", "Design Department"));
//    	Reuniao reuniao = new Reuniao(1, "Revision", "Weekly Revision", departamentos);
//    	
//        when(reuniaoService.buscarPorId(1)).thenReturn(reuniao);
//        
//        mockMvc.perform(get("/meetings/{id}", 1))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
//                .andExpect(jsonPath("$.id", is(1)))
//                .andExpect(jsonPath("$.nome", is("Revision")));
//        
//        verify(reuniaoService, times(1)).buscarPorId(1);
//        verifyNoMoreInteractions(reuniaoService);
//    }
//    
//    @Test
//    public void test_get_by_id_fail_404_not_found() throws Exception {
//        when(reuniaoService.buscarPorId(1)).thenReturn(null);
//        
//        mockMvc.perform(get("/reuniaos/{id}", 1))
//                .andExpect(status().isNotFound());
//        
//        verify(reuniaoService, times(1)).buscarPorId(1);
//        verifyNoMoreInteractions(reuniaoService);
//    }
//    
//    @Test
//    public void test_create_success() throws Exception {
//        List<Departamento> departamentos = Arrays.asList(new Departamento(1, "Engineering", "Engineering Department"),
//        		new Departamento(2, "Design", "Design Department"));
//    	Reuniao reuniao = new Reuniao(1, "Revision", "Weekly Revision", departamentos);
//    	
////        when(reuniaoService.salvar(reuniao)).thenReturn(Boolean.TRUE);
//        
//        mockMvc.perform(post("/meetings")
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .content(asJsonString(reuniao)))
//            		.andExpect(status().isCreated());
//        
//        verify(reuniaoService, times(1)).salvar(reuniao);
//        verifyNoMoreInteractions(reuniaoService);
//    }
//    
//    @Test
//    public void test_update_success() throws Exception {
//        List<Departamento> departamentos = Arrays.asList(new Departamento(1, "Engineering", "Engineering Department"),
//        		new Departamento(2, "Design", "Design Department"));
//    	Reuniao reuniao = new Reuniao(1, "Revision", "Weekly Revision", departamentos);
//    	
//        when(reuniaoService.atualizar(reuniao)).thenReturn(Boolean.TRUE);
//        
//        mockMvc.perform(
//                put("/reuniaos/{id}", reuniao.getId())
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .content(asJsonString(reuniao)))
//                	.andExpect(status().isOk());
//        
//        verify(reuniaoService, times(1)).atualizar(reuniao);
//        verifyNoMoreInteractions(reuniaoService);
//    }
//    
//    @Test
//    public void test_delete_success() throws Exception {
//        List<Departamento> departamentos = Arrays.asList(new Departamento(1, "Engineering", "Engineering Department"),
//        		new Departamento(2, "Design", "Design Department"));
//    	Reuniao reuniao = new Reuniao(1, "Revision", "Weekly Revision", departamentos);
//    	
//        when(reuniaoService.excluirPorId(reuniao.getId())).thenReturn(Boolean.TRUE);
//        
//        mockMvc.perform(
//                delete("/reuniaos/{id}", reuniao.getId()))
//                .andExpect(status().isNoContent());
//        
//        verify(reuniaoService, times(1)).excluirPorId(reuniao.getId());
//        verifyNoMoreInteractions(reuniaoService);
//    }    
//    
//    public static String asJsonString(final Object obj) {
//        try {
//            final ObjectMapper mapper = new ObjectMapper();
//            return mapper.writeValueAsString(obj);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }    
//}
